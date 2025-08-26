import { List, DataTable, EmailField } from "react-admin";

export const CommentsList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="song_id" />
            <DataTable.Col source="user_id" />
            <DataTable.Col source="text" />
        </DataTable>
    </List>
);