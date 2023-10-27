import prisma from '@/lib/db/prisma';
import { BundleRepository } from '../domain/bundle.repository';
import { toBundleDomainModel } from './bundle.prisma.mapper';
import { trackIncludes } from '@/modules/track/infrastructure/track.prisma.repository';
import { RepositoryCreateBundleInput } from '../domain/validations/CreateBundleTypes';
import { RepositoryEditBundleInput } from '../domain/validations/EditBundleTypes';
import { RepositoryGetBundlesQuery } from '../domain/validations/GetBundlesTypes';

export const bundleIncludes = {
  tracks: {
    include: {
      track: {
        include: trackIncludes,
      },
    },
  },
  types: true,
};

export class BundlePrismaRepository implements BundleRepository {
  async findOne(id: number) {
    const bundle = await prisma.bundle.findFirst({
      where: { id },
      include: bundleIncludes,
    });
    if (!bundle) return null;
    return toBundleDomainModel(bundle);
  }

  async getAll() {
    const bundles = await prisma.bundle.findMany({
      orderBy: { id: 'desc' },
      include: bundleIncludes,
    });
    if (!bundles) return [];
    return bundles.map((item) => toBundleDomainModel(item));
  }

  async findAllWithQuery(query: RepositoryGetBundlesQuery) {
    const { page = 1, count = 10, type } = query;
    const offset = (page - 1) * 10;

    let whereCondition: any = {};

    if (type) {
      whereCondition.types = {
        some: {
          name: type,
        },
      };
    }

    const bundles = await prisma.bundle.findMany({
      where: {
        ...whereCondition,
        status: 'PUBLISH',
      },
      include: bundleIncludes,
      skip: offset,
      take: count,
    });

    return bundles.map((bundle) => toBundleDomainModel(bundle));
  }

  async create(data: RepositoryCreateBundleInput) {
    const { typeIds, trackIds, ...rest } = data;
    const bundle = await prisma.bundle.create({
      data: {
        ...rest,
        createdAt: new Date(),
        types: {
          connect: typeIds.map((id) => {
            return { id: id };
          }),
        },
        tracks: {
          create: trackIds.map((id) => {
            return {
              track: {
                connect: { id: id },
              },
            };
          }),
        },
      },
      include: bundleIncludes,
    });
    return toBundleDomainModel(bundle);
  }

  async edit(id: number, updatedField: RepositoryEditBundleInput) {
    const { typeIds, trackIds, ...rest } = updatedField;
    console.log(trackIds);
    if (trackIds) {
      await prisma.bundle.update({
        where: { id },
        data: {
          tracks: {
            deleteMany: {},
          },
        },
      });
    }

    const updatedBundle = await prisma.bundle.update({
      where: { id },
      data: {
        ...rest,
        types: typeIds ? { set: typeIds.map((id) => ({ id })) } : undefined,
        tracks:
          trackIds && 0 < trackIds.length
            ? {
                create: trackIds.map((id) => {
                  return {
                    track: {
                      connect: { id: id },
                    },
                  };
                }),
              }
            : undefined,
      },
      include: bundleIncludes,
    });

    return toBundleDomainModel(updatedBundle);
  }

  async delete(id: number) {
    const exist = await prisma.bundle.findFirst({
      where: { id },
      include: bundleIncludes,
    });

    if (!exist) {
      throw new Error('Bundle이 존재하지 않습니다.');
    }
    // 연결 된 참조 끊기
    await prisma.bundle.update({
      where: { id },
      data: {
        types: {
          set: [],
        },
        tracks: {
          set: [],
        },
      },
    });
    await prisma.bundle.delete({ where: { id } });

    return toBundleDomainModel(exist);
  }

  async likeBundle(userId: string, bundleId: number) {
    const likedBundle = await prisma.bundleLike.create({
      data: {
        userId,
        bundleId,
      },
    });

    return likedBundle;
  }

  async unlikeBundle(userId: string, bundleId: number) {
    const deletedBundle = await prisma.bundleLike.delete({
      where: {
        userId_bundleId: {
          userId,
          bundleId,
        },
      },
    });

    return deletedBundle;
  }

  async getLikedBundlesByUser(userId: string) {
    const likedBundles = await prisma.bundleLike.findMany({
      where: {
        userId,
      },
      include: {
        bundle: {
          include: bundleIncludes,
        },
      },
    });

    return likedBundles.map((like) => toBundleDomainModel(like.bundle));
  }
}
