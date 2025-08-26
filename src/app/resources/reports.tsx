import { List, DataTable, EmailField } from "react-admin";

export const ReportsList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="target_type" />
            <DataTable.Col source="target_id" />
            <DataTable.Col source="reporter_id" />
            <DataTable.Col source="reporter_id" />
            <DataTable.Col source="reason" />
            <DataTable.Col source="status" />
        </DataTable>
    </List>
);