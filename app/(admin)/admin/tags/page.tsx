import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllGenres } from '@/modules/genres/application/getAllGenres';
import { getAllMoods } from '@/modules/mood/application/getAllMoods';
import { DataTable } from '@/components/dataTable/DataTable';
import { genresColumns } from '@/components/admin/dataTableColumns/GenresColumns';
import { moodColumns } from '@/components/admin/dataTableColumns/MoodColumns';
import { CreateGenresDialog } from '@/modules/admin/application/createGenres/CreateGenresDialog';
import { CreateMoodDialog } from '@/modules/admin/application/createMood/CreateMoodDialog';

export default async function TagsPage() {
  const genres = await getAllGenres();
  const moods = await getAllMoods();
  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <Tabs defaultValue="genres" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="genres" className="relative">
              장르
            </TabsTrigger>
            <TabsTrigger value="mood">분위기</TabsTrigger>
            <TabsTrigger value="category" disabled>
              커뮤니티
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="genres" className="border-none p-0 outline-none">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Genres List
              </h2>
              <p className="text-sm text-muted-foreground">
                장르 태그 추가, 수정, 삭제
              </p>
            </div>
            <div className="ml-auto mr-4">
              <CreateGenresDialog />
            </div>
          </div>
          <Separator className="my-4" />

          <div className="relative">
            <div className="container mx-auto py-5">
              <DataTable
                columns={genresColumns}
                data={genres}
                filterField={'tag'}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="mood"
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Mood List
              </h2>
              <p className="text-sm text-muted-foreground">
                분위기 태그 추가, 수정, 삭제
              </p>
            </div>
            <div className="ml-auto mr-4">
              <CreateMoodDialog />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <div className="container mx-auto py-5">
              <DataTable
                columns={moodColumns}
                data={moods}
                filterField={'tag'}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
