import { List, DataTable, EmailField, Edit, SimpleForm, TextInput, Create } from "react-admin";

export const UsersList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="username" />
            <DataTable.Col source="email" />
            <DataTable.Col source="role" />
        </DataTable>
    </List>
);

export const UsersEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="role" />
        </SimpleForm>
    </Edit>
);

export const UsersCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="role" />
        </SimpleForm>
    </Create>
);