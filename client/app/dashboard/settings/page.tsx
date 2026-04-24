'use client';

import { useAppDispatch, useAppSelector } from '@/redux/redux';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  BadgeCheck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  AlertTriangle,
  Edit2,
  X,
  Save,
  Trash2,
  Building2,
  FileText
} from 'lucide-react';

import { useChangePasswordMutation } from '@/redux/api/auth';
import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from '@/redux/api/employee';
import {
  useDeleteRestaurantMutation,
  useUpdateRestuarantDetailsMutation,
} from '@/redux/api/restaurant';
import { toast } from 'react-toastify';
import { setUser } from '@/redux/states/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EmployeeSettings() {
  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector((state) => state.auth);

  const [expanded, setExpanded] = useState<string | null>('info');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<any>(user || {});
  const [profileImage, setProfileImage] = useState(user?.thumbnail);

  // APIs
  const [updateEmployeeApi, { isLoading: updateEmployeeLoader }] =
    useUpdateEmployeeMutation();
  const [deleteEmployeeApi, { isLoading: deleteEmployeeLoader }] =
    useDeleteEmployeeMutation();
  const [updateRestaurantApi, { isLoading: updateRestaurantLoader }] =
    useUpdateRestuarantDetailsMutation();
  const [deleteRestaurantApi, { isLoading: deleteRestaurantLoader }] =
    useDeleteRestaurantMutation();
  const [changePasswordApi, { isLoading: changePasswordLoader }] =
    useChangePasswordMutation();

  useEffect(() => {
    if (user) {
      setPersonalDetails(user);
      setProfileImage(
        user?.thumbnail ??
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name || 'User',
          )}&background=random`,
      );
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const toggleExpand = (section: string) => {
    setExpanded(expanded === section ? null : section);
    if (section === 'info') setIsEditing(false);
  };

  const handleEdit = () => {
    setExpanded('info');
    setIsEditing(true);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const ChangePasswordHandler = async (data: any) => {
    try {
      const response = await changePasswordApi({
        id: user?.id,
        ...data,
        role,
      }).unwrap();
      if (!response?.success) {
        throw new Error(response?.message);
      }
      reset();
      toast.success('Password changed successfully!');
      setExpanded(null);
    } catch (error: any) {
      //console.log('Change password error', error);
      toast.error(error?.message || 'Failed to change password');
    }
  };

  const UpdateUserHandler = async () => {
    setIsEditing(false);
    try {
      let response;
      if (role === 'Restaurant') {
        response = await updateRestaurantApi({
          restaurantId: user?.id,
          ...personalDetails,
        }).unwrap();
      } else if (role === 'User') {
        response = await updateEmployeeApi({
          id: user?.id,
          ...personalDetails,
        }).unwrap();
      }

      if (!response || !response?.success) {
        throw new Error(response?.message);
      }

      dispatch(setUser(response?.data));
      toast.success('Information Updated successfully!');
    } catch (error: any) {
      //console.log('Update user error', error);
      toast.error(error?.message || 'Something went wrong!');
    }
  };

  const DeleteUserHandler = async () => {
    try {
      let response;
      if (role === 'Restaurant') {
        response = await deleteRestaurantApi({
          restaurantId: user?.id,
        }).unwrap();
      } else if (role === 'User' && user?.id) {
        response = await deleteEmployeeApi(user.id).unwrap();
      }

      if (!response || !response?.success) {
        throw new Error(response?.message);
      }

      toast.success('Account Deleted!');
      // Typically you'd also log the user out here
    } catch (error: any) {
      //console.log('Delete user error', error);
      toast.error(error?.message || 'Something went wrong!');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-6 md:px-10">
      <motion.div 
        className="mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Account Settings</h1>
          <p className="mt-2 text-gray-500">Manage your profile, preferences, and security.</p>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div variants={itemVariants} className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
          <div className="relative h-32 bg-gradient-to-r from-primary to-orange-400 sm:h-40">
            {/* Background Cover */}
          </div>
          <div className="relative px-6 pb-6 sm:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
              <div className="-mt-16 sm:-mt-20">
                <label className="relative group cursor-pointer inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={role !== 'Restaurant'}
                  />
                  <div className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                        <User size={48} />
                      </div>
                    )}
                    {role === 'Restaurant' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Camera className="text-white" size={32} />
                      </div>
                    )}
                  </div>
                </label>
              </div>
              <div className="mt-4 flex-1 pb-2 sm:mt-0 sm:pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                      {personalDetails?.name || 'User'}
                      {personalDetails?.isVerified && (
                        <BadgeCheck className="text-blue-500" size={24} />
                      )}
                    </h2>
                    <p className="flex items-center gap-2 text-gray-500 mt-1">
                      <Mail size={16} /> {personalDetails?.email}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-3 sm:mt-0">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {role}
                    </span>
                    {!isEditing && (
                      <Button
                        onClick={handleEdit}
                        variant="outline"
                        className="gap-2"
                      >
                        <Edit2 size={16} />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          
          {/* Information Section */}
          <motion.div variants={itemVariants} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
            <button
              onClick={() => toggleExpand('info')}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {role === 'Restaurant' ? <Building2 size={20} /> : <User size={20} />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {role === 'Restaurant' ? 'Restaurant Information' : 'Personal Information'}
                  </h3>
                  <p className="text-sm text-gray-500">Update your basic profile details.</p>
                </div>
              </div>
              <div className={`transform transition-transform duration-300 ${expanded === 'info' ? 'rotate-180' : ''}`}>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <AnimatePresence>
              {expanded === 'info' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100 px-6 pb-6 pt-4"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        {role === 'Restaurant' ? <Building2 size={16} className="text-muted-foreground"/> : <User size={16} className="text-muted-foreground"/>}
                        Name
                      </label>
                      <Input
                        type="text"
                        value={personalDetails?.name || ''}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Mail size={16} className="text-muted-foreground"/>
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={personalDetails?.email || ''}
                        disabled
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Phone size={16} className="text-muted-foreground"/>
                        Phone Number
                      </label>
                      <Input
                        type="text"
                        value={personalDetails?.number || ''}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, number: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    {role === 'Restaurant' && (
                      <>
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <FileText size={16} className="text-muted-foreground"/>
                            Slogan
                          </label>
                          <Input
                            type="text"
                            value={personalDetails?.slogan || ''}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, slogan: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="col-span-1 sm:col-span-2 space-y-1">
                          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <MapPin size={16} className="text-muted-foreground"/>
                            Address
                          </label>
                          <Input
                            type="text"
                            value={personalDetails?.address || ''}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {isEditing && (
                      <div className="mt-6 flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => { setIsEditing(false); setPersonalDetails(user); }}
                        >
                          <X size={16} />
                          Cancel
                        </Button>
                        <Button onClick={UpdateUserHandler} className="gap-2">
                          <Save size={16} />
                          Save Changes
                        </Button>
                      </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Change Password Section */}
          <motion.div variants={itemVariants} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
            <button
              onClick={() => toggleExpand('password')}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                  <p className="text-sm text-gray-500">Update your password to keep your account secure.</p>
                </div>
              </div>
              <div className={`transform transition-transform duration-300 ${expanded === 'password' ? 'rotate-180' : ''}`}>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <AnimatePresence>
              {expanded === 'password' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100 px-6 pb-6 pt-4"
                >
                  <form onSubmit={handleSubmit(ChangePasswordHandler)} className="mx-auto max-w-2xl space-y-5">
                    {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                      <div key={field} className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 capitalize flex items-center justify-between">
                          {field.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <Input
                          type="password"
                          placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                          {...register(field, {
                            required: `${field.replace(/([A-Z])/g, ' $1')} is required`,
                          })}
                          className={errors[field] ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors[field] && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                            <AlertTriangle size={12} />
                            {errors[field]?.message as string}
                          </p>
                        )}
                      </div>
                    ))}
                    <div className="pt-4 flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => { reset(); toggleExpand('password'); }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Update Password
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Delete Account Section */}
          <motion.div variants={itemVariants} className="overflow-hidden rounded-2xl border border-red-100 bg-red-50/30 shadow-sm transition-all hover:shadow-md hover:bg-red-50/50">
            <button
              onClick={() => toggleExpand('delete')}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
                  <p className="text-sm text-red-600/80">Permanently delete your account and all data.</p>
                </div>
              </div>
              <div className={`transform transition-transform duration-300 text-red-400 ${expanded === 'delete' ? 'rotate-180' : ''}`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <AnimatePresence>
              {expanded === 'delete' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-red-100 px-6 pb-6 pt-4"
                >
                  <p className="text-sm text-red-700 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => setShowModal(true)}
                    className="gap-2"
                  >
                    <Trash2 size={16} />
                    Delete Account
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto">
                    <AlertTriangle size={24} />
                  </div>
                  <h3 className="text-center text-xl font-bold text-gray-900">Delete Account?</h3>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently remove all your data from our servers.
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-6 py-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={DeleteUserHandler}
                  >
                    Yes, Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
