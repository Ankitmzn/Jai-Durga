import React from 'react';

const UserDashboard = () => {
    const role = localStorage.getItem('role');
    if (role !== 'USER') {
        window.location.href = '/admin/dashboard'; // Redirect to admin dashboard if not user
    }

    return (
        <div>
            <h1>User Dashboard</h1>
            <p>Welcome, User!</p>
            {/* User-related features */}
        </div>
    );
};

export default UserDashboard;
