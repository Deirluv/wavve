import { List, DataTable} from "react-admin";

export const AnalyticsList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="song_id" />
            <DataTable.Col source="date" />
            <DataTable.Col source="plays" />
            <DataTable.Col source="likes" />
            <DataTable.Col source="comments_count" />
        </DataTable>
    </List>
);