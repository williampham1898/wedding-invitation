import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { invitationBride, invitationGroom } from './config/invitation'
import InvitationPage from './InvitationPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/thanhpb" replace />} />
        <Route path="/thanhpb" element={<InvitationPage key="thanhpb" data={invitationGroom} />} />
        <Route path="/linhbd" element={<InvitationPage key="linhbd" data={invitationBride} />} />
        <Route path="*" element={<Navigate to="/thanhpb" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
