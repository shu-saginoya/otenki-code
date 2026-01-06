-- RLS設定のサンプルファイル

-- todosテーブルを作成
create table todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLSを有効化
alter table todos enable row level security;

-- ユーザーは自分のToDoのみ参照可能
create policy "ユーザーは自分のToDoを参照できる"
  on todos for select
  using ( auth.uid() = user_id );

-- ユーザーは自分のToDoのみ作成可能
create policy "ユーザーは自分のToDoを作成できる"
  on todos for insert
  with check ( auth.uid() = user_id );

-- ユーザーは自分のToDoのみ更新可能
create policy "ユーザーは自分のToDoを更新できる"
  on todos for update
  using ( auth.uid() = user_id );

-- ユーザーは自分のToDoのみ削除可能
create policy "ユーザーは自分のToDoを削除できる"
  on todos for delete
  using ( auth.uid() = user_id );
