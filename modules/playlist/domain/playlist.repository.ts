import { UserPlaylist as DomainUserPlaylist } from './playlist';
import { RepositoryCreatePlaylistInput } from './validations/CreatePlaylistTypes';
import { RepositoryEditPlaylistInput } from './validations/EditPlaylistTypes';

export interface PlaylistRepository {
  findOne: (id: string) => Promise<DomainUserPlaylist | null>;
  findAllByUserId: (userId: string) => Promise<DomainUserPlaylist[]>;
  create: (data: RepositoryCreatePlaylistInput) => Promise<DomainUserPlaylist>;
  delete: (id: string) => Promise<void>;
  edit: (
    id: string,
    updatedField: RepositoryEditPlaylistInput
  ) => Promise<DomainUserPlaylist>;
}
