import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllGenres } from '@/modules/genres/application/getAllGenres';
import { getAllMoods } from '@/modules/mood/application/getAllMoods';
import { DataTable } from '@/components/dataTable/DataTable';
import { genresColumns } from '@/components/admin/dataTableColumns/GenresColumns';
import { moodColumns } from '@/components/admin/dataTableColumns/MoodColumns';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Genres
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Genres</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tag" className="text-right">
                        Tag
                      </Label>
                      <Input id="tag" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="slug" className="text-right">
                        slug
                      </Label>
                      <Input id="slug" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">생성</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Mood
              </Button>
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
