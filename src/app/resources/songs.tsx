import { List, DataTable, EmailField } from "react-admin";

export const SongsList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="author_id" />
            <DataTable.Col source="audio_url" />
            <DataTable.Col source="cover_url" />
            <DataTable.Col source="duration" />
            <DataTable.Col source="plays_count" />
            <DataTable.Col source="likes_count" />
        </DataTable>
    </List>
);