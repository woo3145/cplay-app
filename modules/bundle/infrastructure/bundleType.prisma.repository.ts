import prisma from '@/lib/db/prisma';
import { BundleTypeRepository } from '../domain/bundle.repository';
import { toBundleTypeDomainModel } from './bundle.prisma.mapper';
import { RepositoryCreateBundleTypeInput } from '../domain/validations/CreateBundleTypes';
import { RepositoryEditBundleTypeInput } from '../domain/validations/EditBundleTypes';

export class BundleTypePrismaRepository implements BundleTypeRepository {
  async findOne(id: number) {
    const bundleType = await prisma.bundleType.findFirst({ where: { id } });
    if (!bundleType) return null;
    return toBundleTypeDomainModel(bundleType);
  }

  async getAll() {
    const bundleTypes = await prisma.bundleType.findMany({
      orderBy: { id: 'desc' },
    });
    if (!bundleTypes) return [];
    return bundleTypes.map((item) => toBundleTypeDomainModel(item));
  }

  async create({ name }: RepositoryCreateBundleTypeInput) {
    const bundleType = await prisma.bundleType.create({
      data: {
        name,
      },
    });
    return toBundleTypeDomainModel(bundleType);
  }
  async edit(id: number, updatedField: RepositoryEditBundleTypeInput) {
    const updatedMood = await prisma.bundleType.update({
      where: { id },
      data: updatedField,
    });

    return toBundleTypeDomainModel(updatedMood);
  }
  async delete(id: number) {
    const exist = await prisma.bundleType.findFirst({ where: { id } });

    if (!exist) {
      throw new Error('BundleType이 존재하지 않습니다.');
    }
    // 연결 된 참조 끊기
    await prisma.bundleType.update({
      where: { id },
      data: {
        bundles: {
          set: [],
        },
      },
    });
    await prisma.bundleType.delete({ where: { id } });
  }
}
