import { useAppSelector } from '@/redux/redux';
import { useGetRestaurantDetailsQuery } from '@/redux/api/restaurant';
import { useGetEmployeeDetailsQuery } from '@/redux/api/employee';
import { USER_ROLE_TYPE } from '@/constants/CommonConstant';

export const useGlobalDetails = () => {
  const { restaurantId, role, user } = useAppSelector((state) => state.auth);

  const isRestaurant = role === USER_ROLE_TYPE.RESTAURANT;
  const isEmployee = role === USER_ROLE_TYPE.EMPLOYEE;

  const { data: restaurantData, isLoading: isResLoading } = useGetRestaurantDetailsQuery(
    restaurantId, 
    { skip: !isRestaurant || !restaurantId }
  );

  const { data: employeeData, isLoading: isEmpLoading } = useGetEmployeeDetailsQuery(
    user?.id || '', 
    { skip: !isEmployee || !user?.id }
  );

  const restaurantDetails = isRestaurant ? restaurantData : (employeeData as any)?.restaurant;
  
  return {
    restaurantDetails,
    employeeDetails: isEmployee ? employeeData : null,
    isLoading: isResLoading || isEmpLoading
  };
};
