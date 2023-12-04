import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8061/api/'
});

export const authAPI = {
    registration(registrationRequest) {
        return instance.post('auth/registration', registrationRequest)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            if (err.response) {
              return err.response;
            }
          });
    },
    authentication(authRequest) {
        return instance.post('auth/login', authRequest)
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return {user: response.data.user, jwt: response.data.token}
        })
        .catch(err => {
            if (err.response) {
              return err.response;
            }
          });
    },
}

export const employeesAPI = {
    
    async getEmployees (jwt) {
        return await instance.get('employees',{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            return response.data
        });
    },
    getEmployee(jwt, employeeId) {
        return instance.get('employees/' + employeeId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => { 
            return response.data
        })
        .catch(err=> {
            if(err.response) {
                return err.response;
            }
        });
    },
    async addEmployee(jwt, employee) {
        return await instance.post('employees', employee,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
            .catch(err=> {
                if(err.response) {
                    return err.response;
                }
            });
    },
    deleteEmployee(jwt, employeeId) {
        instance.delete('employees/'+ employeeId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }});
    },
    async editEmployee(jwt, employeeId, updatedEmployee){
        return await instance.put('employees/'+ employeeId, updatedEmployee,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
            .catch(err=> {
                if(err.response) {
                    return err.response;
                }
            });
    },
    updateImage(jwt, employeeId, linkToImage){
        instance.put('employees/'+ employeeId + '/updateImage', {linkToImage: linkToImage},{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            });
    }
}

export const productsAPI = {
    getProducts(jwt) {
        return instance.get('products',{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            return response.data
        });
    },
    getProduct(jwt, productId) {
        return instance.get('products/' + productId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            return response.data
        })
        .catch(err=> {
            if(err.response) {
                return err.response;
            }
        });
    },
    async addProduct(jwt, product) {
        return await instance.post('products', product,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
            .catch(err=> {
                if(err.response) {
                    return err.response;
                }
            });
    },
    deleteProduct(jwt, productId) {
        instance.delete('products/'+ productId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }});
    },
    async editProduct(jwt, productId, updatedProduct){
        return await instance.put('products/'+ productId, updatedProduct,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
            .catch(err=> {
                if(err.response) {
                    console.log('sdjfsdf');
                    return err.response;
                }
            });
    }
}

export const positionsAPI = {
    getPositions(jwt) {
        return instance.get('employees/positions',{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            return response.data
        });
    }
}

export const viewsAPI = {
    getWellPaidEmployeesView(jwt) {
        return instance.get('views',{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            return response.data;
        })
    }
}

export const suppliersAPI = {
    getSuppliers(jwt) {
        return instance.get('suppliers',{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            return response.data
        });
    },
    getSupplier(jwt, supplierId) {
        return instance.get('suppliers/' + supplierId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            return response.data
        })
        .catch(err=> {
            if(err.response) {
                return err.response;
            }
        });
    },
    async addSupplier(jwt, supplier) {
        return await instance.post('suppliers', supplier,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
            .catch(err=> {
                if(err.response) {
                    return err.response;
                }
            });
    },
    deleteSupplier(jwt, supplierId) {
        instance.delete('suppliers/'+ supplierId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }});
    },
    async editSupplier(jwt, supplierId, updatedSupplier){
        return await instance.put('suppliers/'+ supplierId, updatedSupplier,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
            .catch(err=> {
                if(err.response) {
                    return err.response;
                }
            });
    }
}

export const ordersAPI = {
    getOrders(jwt) {
        return instance.get('orders',{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            return response.data;
        })
    },
    getOrder(jwt, orderId) {
        return instance.get('orders/' + orderId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            console.log(response.data);
            return response.data
        })
        .catch(err=> {
            if(err.response) {
                return err.response;
            }
        });
    },
    async addOrder(jwt, order) {
        instance.post('orders', order,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
            .catch(err=> {
                if(err.response) {
                    return err.response;
                }
            });
    },
    deleteOrder(jwt, orderId) {
        instance.delete('orders/'+ orderId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }});
    }
}

export const deliveriesAPI = {
    getDeliveries(jwt) {
        return instance.get('deliveries',{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            return response.data;
        })
    },
    getDelivery(jwt, deliveryId) {
        return instance.get('deliveries/' + deliveryId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }})
        .then(response => {
            console.log(response.data)
            return response.data;
        })
        .catch(err=> {
            if(err.response) {
                return err.response;
            }
        });
    },
    async addDelivery(jwt, delivery) {
        return await instance.post('deliveries', delivery,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }});
    },
    deleteDelivery(jwt, deliveryId) {
        instance.delete('deliveries/'+ deliveryId,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }});
    },
    async editDelivery(jwt, deliveryId, updatedDelivery){
        return await instance.put('deliveries/'+ deliveryId, updatedDelivery,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }});
    }
}