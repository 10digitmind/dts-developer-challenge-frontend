
import Header from './Header'
import Footer from './Footer'
import Createtask from './Createtask'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Home() {
  return (
    <div>
        <ToastContainer />
      <Header/>
      <Createtask/>
      <Footer/>
    </div>
  )
}
