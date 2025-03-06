import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { Avatar, Button, Card, CardBody, Input } from "@nextui-org/react";
import { Settings, LogOut, Save } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "../../firebase"; // Adjust import as needed

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("This is my bio..."); // Editable bio
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate(); // Use React Router for navigation

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <p className="text-center mt-5 text-gray-500">Loading...</p>;

  if (!user) return <p className="text-center mt-5 text-red-500">No user logged in.</p>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardBody className="flex flex-col items-center gap-4 p-8">
          {/* Profile Avatar */}
          <Avatar
            src={user.photoURL || undefined}
            name={user.displayName || "User"}
            size="lg"
            className="w-24 h-24 text-2xl"
          />
          {/* User Info */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">{user.displayName || "User"}</h1>
            <p className="text-default-500">{user.email}</p>
          </div>

          {/* Editable Bio Section */}
          {editMode ? (
            <div className="flex items-center gap-2 w-full">
              <Input
                type="text"
                variant="bordered"
                fullWidth
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-gray-200"
              />
              <Button isIconOnly color="primary" onClick={() => setEditMode(false)}>
                <Save size={20} />
              </Button>
            </div>
          ) : (
            <p
              className="text-default-500 cursor-pointer hover:underline"
              onClick={() => setEditMode(true)}
            >
              {bio} ✏️
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => navigate("/profile/settings")} // React Router Navigation
              color="primary"
              startContent={<Settings size={20} />}
            >
              Settings
            </Button>
            <Button
              color="danger"
              startContent={<LogOut size={20} />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
