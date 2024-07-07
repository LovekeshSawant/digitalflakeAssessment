import "./App.css";
import LoginPage from "./Components/LoginPage";
import Home from "./Components/Home";
import CategoryList from "./Components/CategoryList";
import SubCategoryList from "./Components/SubCategoryList";
import AddCategoryList from "./Components/AddCategoryList";

import AddSubCategoryList from "./Components/AddSubCategoryList";

import ProductList from "./Components/ProductList";
import AddProduct from "./Components/AddProduct";

import SideNavBar from "./Components/SideNavBar";
import EditCategory from "./Components/EditCategory";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateComponent from "./Components/PrivateComponent";

function App() {
  const user = localStorage.getItem("user");
  return (
    <div className="App">
      <BrowserRouter>
        {/* {user?<SideNavBar/>:null} */}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/home" element={<Home />} />

            <Route path="/category" element={<CategoryList/>} />
            <Route path="/subCategory" element={<SubCategoryList/>} />
            <Route path="/products" element={<ProductList />} />

            <Route path="/addCategory" element={<AddCategoryList />} />
            <Route path="/addSubCategory" element={<AddSubCategoryList />} />
            <Route path="/addProduct" element={<AddProduct />} />

            <Route path="/editCategory" element={<EditCategory />} />
          </Route>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
