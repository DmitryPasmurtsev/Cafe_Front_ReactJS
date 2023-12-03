import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import ProductCreation from './components/Products/ProductCreation/ProductCreation';
import EmployeeEditing from './components/Employees/EmployeeEditing/EmployeeEditing';
import ProductEditing from './components/Products/ProductEditing/ProductEditing';
import EmployeeInfo from './components/Employees/EmployeeInfo/EmployeeInfo';
import ProductInfo from './components/Products/ProductInfo/ProductInfo';
import SuppliersPage from './components/Suppliers/Suppliers';
import SupplierInfo from './components/Suppliers/SupplierInfo/SupplierInfo';
import SupplierEditing from './components/Suppliers/SupplierEditing/SupplierEditing';
import OrdersPage from './components/Orders/Orders';
import OrderInfo from './components/Orders/OrderInfo/OrderInfo';
import DeliveriesPage from './components/Deliveries/Deliveries';
import DeliveryInfo from './components/Deliveries/DeliveryInfo/DeliveryInfo';
import ProductsPage from './components/Products/Products';
import EmployeesPage from './components/Employees/Employees';
import DeliveryEditing from './components/Deliveries/DeliveryEditing/DeliveryEditing';
import DeliveryCreation from './components/Deliveries/DeliveryCreation/DeliveryCreation';
import EmployeeCreation from './components/Employees/EmployeeCreation/EmployeeCreation';
import SupplierCreation from './components/Suppliers/SupplierCreation/SupplierCreation';
import OrderCreation from './components/Orders/OrderCreation/OrderCreation';
import PrivateRoute from './components/commons/PrivateRoute';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import AccountInfo from './components/account/AccountInfo';
import { useSelector } from 'react-redux';
import { getUserSel } from './redux/selectors/user-selectors';


const App = () => {
  let user = useSelector(getUserSel);
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          <Route path="/employees" element={<PrivateRoute><EmployeesPage/></PrivateRoute>} />
          <Route path="/employees/:employeeId" element={<PrivateRoute><EmployeeInfo /></PrivateRoute>} />
          <Route path="/employees/edit/:employeeId" element={<PrivateRoute><EmployeeEditing /></PrivateRoute>} />
          <Route path="/employees/create" element={
            <PrivateRoute>
            {(["ROLE_DIRECTOR", "ROLE_ADMINISTRATOR"].includes(user?.role)) && <EmployeeCreation/>}
            </PrivateRoute>
          } />

          <Route path="/products" element={<PrivateRoute><ProductsPage/></PrivateRoute>} />
          <Route path="/products/:productId" element={<PrivateRoute><ProductInfo/></PrivateRoute>} />
          <Route path="/products/create" element={
            <PrivateRoute>
              {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user?.role)) && <ProductCreation/>}
            </PrivateRoute> 
          } />
          <Route path="/products/edit/:productId" element={
            <PrivateRoute>
              {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user?.role)) && <ProductEditing/>}
            </PrivateRoute> 
          } />

          <Route path="/suppliers" element={<PrivateRoute><SuppliersPage/></PrivateRoute>} />
          <Route path="/suppliers/:supplierId" element={<PrivateRoute><SupplierInfo/></PrivateRoute>} />
          <Route path="/suppliers/create" element={
            <PrivateRoute>
              {(["ROLE_DIRECTOR", "ROLE_ADMINISTRATOR"].includes(user?.role)) && <SupplierCreation/>}
            </PrivateRoute> 
          } />
          <Route path="/suppliers/edit/:supplierId" element={
            <PrivateRoute>
            {(["ROLE_DIRECTOR", "ROLE_ADMINISTRATOR"].includes(user?.role)) && <SupplierEditing/>}
          </PrivateRoute> 
          } />

          <Route path="/orders" element={<PrivateRoute><OrdersPage/></PrivateRoute>} />
          <Route path="/orders/:orderId" element={<PrivateRoute><OrderInfo /></PrivateRoute>} />
          <Route path="/orders/create" element={
            <PrivateRoute>
              {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user?.role)) && <OrderCreation/>}
            </PrivateRoute> 
          } />

          <Route path="/deliveries" element={<PrivateRoute><DeliveriesPage/></PrivateRoute>} />
          <Route path="/deliveries/:deliveryId" element={<PrivateRoute><DeliveryInfo/></PrivateRoute>} />
          <Route path="/deliveries/edit/:deliveryId" element={
            <PrivateRoute>
              {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) && <DeliveryEditing/>}
            </PrivateRoute> 
          } />
          <Route path="/deliveries/create" element={
            <PrivateRoute>
              {(["ROLE_DIRECTOR", "ROLE_WAITER", "ROLE_ADMINISTRATOR"].includes(user.role)) && <DeliveryCreation/>}
            </PrivateRoute> 
          } />
          <Route path="/account" element={<PrivateRoute><AccountInfo/></PrivateRoute>} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
