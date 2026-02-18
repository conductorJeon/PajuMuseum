import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Main from "./pages/main/Main";
import BoardList from "./pages/board/BoardList";
import BoardInsert from "./pages/board/BoardInsert";
import BoardDetail from "./pages/board/BoardDetail";
import BoardUpdate from "./pages/board/BoardUpdate";
import CollectionsList from "./pages/collections/CollectionsList";
import CollectionsDetail from "./pages/collections/CollectionsDetail";
import ChatBot from "./pages/chatbot/ChatBot";

function App() {
  return (
      <BrowserRouter>
          <div className="layout-root">
              <Header />

              <main className="layout-main">
                  <Routes>
                      <Route path="/" element={<Main />} />

                      {/* Collections */}
                      <Route path="/collections" element={<CollectionsList />} />
                      <Route path="/collections/detail/:id" element={<CollectionsDetail />} />

                      {/* Board */}
                      <Route path="/board" element={<BoardList />} />
                      <Route path="/board/write" element={<BoardInsert />} />
                      <Route path="/board/detail/:no" element={<BoardDetail />} />
                      <Route path="/board/edit/:no" element={<BoardUpdate />} />

                      {/* Board */}
                      <Route path="/chatbot" element={<ChatBot />} />
                  </Routes>
              </main>

              <Footer />
          </div>
      </BrowserRouter>
  );
}

export default App;
