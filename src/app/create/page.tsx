import CreateRecord from '../../components/create_record'

export const metadata = {
    title: 'Create Record',
}

export default function Page() {
    return (
        <main style={{ padding: 24 }}>
            <h1>Create Record</h1>
            <div style={{ marginTop: 16 }}>
                <CreateRecord />
            </div>
        </main>
    )
}
