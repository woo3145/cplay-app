import { UserPlaylist as DomainUserPlaylist } from './playlist';
import { RepositoryCreatePlaylistInput } from './validations/CreatePlaylistTypes';
import { RepositoryEditPlaylistInput } from './validations/EditPlaylistTypes';

export interface PlaylistRepository {
  findById: (id: string) => Promise<DomainUserPlaylist>;
  findAllByUserId: (userId: string) => Promise<DomainUserPlaylist[]>;
  create: (data: RepositoryCreatePlaylistInput) => Promise<DomainUserPlaylist>;
  delete: (id: string) => Promise<void>;
  edit: (
    id: string,
    updatedField: RepositoryEditPlaylistInput
  ) => Promise<DomainUserPlaylist>;
}
