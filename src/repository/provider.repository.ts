import { EntityRepository, Repository } from 'typeorm';
import { ProviderEntity } from '../entity/provider.entity';

@EntityRepository(ProviderEntity)
export class ProviderRepository extends Repository<ProviderEntity> {}
