import ApartmentTable from './ApartmentDataTable';

const Dashboard = () => {

    return (
        <div className="h-screen w-full mt-10 md:mt-3 p-3 md:p-10">
            <div className="flex w-full items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Dashboard</h2>
            </div>
            <ApartmentTable />
        </div>
    );
};
export default Dashboard;