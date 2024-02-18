import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import {
  EditNoteForm,
  NoteList,
  Error,
  SignIn,
  SignUp,
  SharedNotes,
  About,
  NotesForm,
  SelectedNote,
  Profile,
} from 'pages';
import { ROUTE } from 'config/constants/routes';
import { MainTemplate } from 'templates';

import { BASE_NAME } from './constants';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.MAIN} element={<MainTemplate />}>
      <Route path={ROUTE.MAIN} element={<SignIn />} />
      <Route path={ROUTE.PROFILE} element={<Profile />} />
      <Route path={ROUTE.NOTES} element={<NoteList />}>
        <Route path={ROUTE.NOTES} element={<SelectedNote />} />
        <Route path={ROUTE.SELECTED_NOTE} element={<SelectedNote />} />
        <Route
          path={ROUTE.MY_NOTE}
          element={<EditNoteForm isShared={false} />}
        />
        <Route path={ROUTE.NOTES_FORM} element={<NotesForm />} />
      </Route>
      <Route path={ROUTE.SHARED} element={<SharedNotes />}>
        <Route path={ROUTE.SHARED} element={<SelectedNote isShared={true} />} />
        <Route
          path={ROUTE.SELECTED_SHARE}
          element={<SelectedNote isShared={true} />}
        />
        <Route
          path={ROUTE.SHARED_NOTE}
          element={<EditNoteForm isShared={true} />}
        />
        <Route path={ROUTE.SHARED_FORM} element={<NotesForm />} />
      </Route>
      <Route path={ROUTE.ABOUT} element={<About />} />
      <Route path={ROUTE.SIGN_IN} element={<SignIn />} />
      <Route path={ROUTE.SIGN_UP} element={<SignUp />} />
      <Route path={ROUTE.NOT_FOUND} element={<Error />} />
      <Route path={ROUTE.ANY} element={<Navigate to={ROUTE.NOT_FOUND} />} />
    </Route>,
  ),
  { basename: BASE_NAME },
);

export default router;
