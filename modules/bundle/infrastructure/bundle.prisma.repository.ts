import prisma from '@/lib/db/prisma';
import { BundleRepository } from '../domain/bundle.repository';
import { toBundleDomainModel } from './bundle.prisma.mapper';
import { trackIncludes } from '@/modules/track/infrastructure/track.prisma.repository';
import { RepositoryCreateBundleInput } from '../domain/validations/CreateBundleTypes';
import { RepositoryEditBundleInput } from '../domain/validations/EditBundleTypes';

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
    const updatedBundle = await prisma.bundle.update({
      where: { id },
      data: updatedField,
      include: bundleIncludes,
    });

    return toBundleDomainModel(updatedBundle);
  }

  async delete(id: number) {
    const exist = await prisma.bundle.findFirst({ where: { id } });

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
    await prisma.bundleType.delete({ where: { id } });
  }
}
