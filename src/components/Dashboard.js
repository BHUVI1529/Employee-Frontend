import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import {
  FaUsers,
  FaUserClock,
  FaCalendarCheck,
  FaExclamationTriangle,
} from 'react-icons/fa';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import Header from './Header';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();

  const [totalStudents, setTotalStudents] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [onLeave, setOnLeave] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  const [attendanceData, setAttendanceData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Present',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: 'Absent',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  });

  const [activities] = useState([
    {
      id: 1,
      content: 'John Doe marked attendance',
      time: '2 hours ago',
      icon: <FaUserClock className="text-white h-5 w-5" />,
      iconBackground: 'bg-blue-500',
    },
    {
      id: 2,
      content: 'Leave request approved for Sarah',
      time: '4 hours ago',
      icon: <FaCalendarCheck className="text-white h-5 w-5" />,
      iconBackground: 'bg-green-500',
    },
    {
      id: 3,
      content: 'New candidate registered',
      time: '1 day ago',
      icon: <FaUsers className="text-white h-5 w-5" />,
      iconBackground: 'bg-purple-500',
    },
  ]);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await fetch('https://employee-attendance-nkz6.onrender.com/api/auth/employees/count');
      //  const response = await fetch('http://localhost:8080/api/auth/employees/count');
        const data = await response.json();
        setTotalStudents(data.total);
      } catch (error) {
        console.error('Error fetching total students:', error);
        setTotalStudents(0);
      }
    };

    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('https://employee-attendance-nkz6.onrender.com/api/attendance/count');
      //  const response = await fetch('http://localhost:8080/api/attendance/count');
        const data = await response.json();
        const presentData = data.present || [0, 0, 0, 0, 0];
        const absentData = data.absent || [0, 0, 0, 0, 0];

        setAttendanceData((prevState) => ({
          ...prevState,
          datasets: [
            { ...prevState.datasets[0], data: presentData },
            { ...prevState.datasets[1], data: absentData },
          ],
        }));
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchTotalStudents();
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    const fetchPresentToday = async () => {
      try {
        const response = await fetch('https://employee-attendance-nkz6.onrender.com/api/attendance/count/present-today');
      //const response = await fetch('http://localhost:8080/api/attendance/count/present-today');
        const data = await response.json();
        setPresentToday(data.presentToday);
      } catch (error) {
        console.error('Error fetching present today count:', error);
        setPresentToday(0);
      }
    };

    fetchPresentToday();
  }, []);

  useEffect(() => {
    const fetchOnLeaveCount = async () => {
      try {
        const response = await fetch('https://employee-attendance-nkz6.onrender.com/api/leave/on-leave-count');
      //  const response = await fetch('http://localhost:8080/api/leave/on-leave-count');
        const data = await response.json();
        setOnLeave(data || 0);
      } catch (error) {
        console.error('Error fetching on leave count:', error);
        setOnLeave(0);
      }
    };

    fetchOnLeaveCount();
  }, []);

  useEffect(() => {
    const fetchAbsentCount = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(
          `https://employee-attendance-nkz6.onrender.com/api/attendance/count/absentees?date=${today}`,
          //`http://localhost:8080/api/attendance/count/absentees?date=${today}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAbsentCount(data);
      } catch (error) {
        console.error('Error fetching absent count:', error);
        setAbsentCount(0);
      }
    };

    fetchAbsentCount();
  }, []);

  

  const handleBarClick = (event, elements) => {
    if (!elements.length) return;
    const index = elements[0].index;
    const day = attendanceData.labels[index];
    const datasetIndex = elements[0].datasetIndex;
    const type = datasetIndex === 0 ? 'Present' : 'Absent';
    alert(`View all ${type} candidates for ${day}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {/* Buttons Section */}
      <div className="bg-white p-4 shadow flex justify-center gap-4">
        <button
          onClick={() => navigate('/candidates')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Candidates
        </button>
        <button
          onClick={() => navigate('/view-attendance')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Attendance
        </button>
        <button
          onClick={() => navigate('/absentees')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Absentees
        </button>
        <button
          onClick={() => navigate('/Leaves')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Leaves
        </button>
      </div>

      <div className="flex-grow px-4 py-4 overflow-y-auto">
        <div className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to the Dashboard
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Students" value={totalStudents} icon={FaUsers} color="border-blue-500" />
          <StatCard title="Present Today" value={presentToday} icon={FaUserClock} color="border-green-500" />
          <StatCard title="On Leave" value={onLeave} icon={FaCalendarCheck} color="border-yellow-500" />
          <StatCard title="Absent" value={absentCount} icon={FaExclamationTriangle} color="border-red-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Overview</h3>
              <Bar
                data={attendanceData}
                options={{
                  responsive: true,
                  onClick: handleBarClick,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
             
            </div>
          </div>
        </div>

        <RecentActivity activities={activities} />
      </div>
    </div>
  );
}

export default Dashboard;
