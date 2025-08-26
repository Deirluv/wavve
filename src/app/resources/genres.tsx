import { List, DataTable, EmailField } from "react-admin";

export const GenresList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="description" />
        </DataTable>
    </List>
);