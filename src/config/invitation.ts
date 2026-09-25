import { withBase } from '../lib/withBase'
import type { InvitationData } from '../types'

const img = (path: string) => withBase(path)

/**
 * RSVP → Google Sheets (mỗi nhà một file).
 * Dán URL web app Apps Script vào đây:
 *   /thanhpb → sheet nhà trai
 *   /linhbd  → sheet nhà gái
 * Cách tạo URL: google-apps-script/README.md
 */
const RSVP_SHEETS = {
  thanhpb:
    'https://script.google.com/macros/s/AKfycbybOlScxK73n9-YCcJe6XWCD-ov_vTHPzF92HE8A3dSLIGCf75enrKhPTQuZdOYKous4g/exec',
  linhbd: 
    'https://script.google.com/macros/s/AKfycbxDFP-I4S2QBuxbrq7ppyEN4bhCE3JHqHDzRTvzfxUfrTDKJwpSlA_y8WSqYTGBysKAqw/exec',
}

const guestSchedule = [
  { id: 'gs-1', time: '09:00', label: 'Đón khách' },
  { id: 'gs-2', time: '10:00', label: 'Khai tiệc' },
]

const groomSchedule = [
  { id: 'gs-1', time: '09:00', label: 'Đón khách' },
  { id: 'gs-2', time: '11:30', label: 'Khai tiệc' },
]

const shared = {
  lang: 'vi' as const,
  site: { title: 'Bá Thanh & Đan Linh' },
  hero: { welcomeText: 'Trân Trọng Kính Mời' },
  couple: {
    brideFirst: false,
    groomHouseLabel: 'Nhà trai',
    brideHouseLabel: 'Nhà gái',
    relationLabel: 'Con của ông bà',
    groom: {
      fullName: 'Phạm Bá Thanh',
      shortName: 'Bá Thanh',
      parentTitle: 'Ông Bà',
      father: 'Phạm Bá Thắng',
      mother: 'Trần Thị Huyền',
      address: 'Số 05, đường Đoàn Kết,\nphường Trần Hưng Đạo,\nthành phố Hải Phòng',
      photo: '',
    },
    bride: {
      fullName: 'Bùi Đan Linh',
      shortName: 'Đan Linh',
      parentTitle: 'Ông Bà',
      father: 'Bùi Văn Định (Cố phụ)',
      mother: 'Nguyễn Thị Thúy Lan',
      address: 'Số 05, thôn Võng Ngoại,\nxã Phúc Lộc,\nthành phố Hà Nội',
      photo: '',
    },
  },
  ceremony: {
    title: 'LỄ ĂN HỎI',
    times: [{ label: 'Lễ Ăn Hỏi', time: '09:00' }],
    date: '2026-10-11',
    timezone: 'Asia/Ho_Chi_Minh',
    venue: 'Tư gia nhà gái',
    address: 'Số 05, thôn Võng Ngoại, xã Phúc Lộc, thành phố Hà Nội',
    mapAddress: '21.137310, 105.550368',
    mapLink: 'https://maps.app.goo.gl/t3zq8Dj1dG1C2TRY9',
    lunarNote: 'Tức ngày 02 tháng 09 năm Bính Ngọ',
    schedule: guestSchedule,
  },
  announcement: {
    text: 'Với niềm hạnh phúc sâu sắc,\nchúng tôi trân trọng báo tin hôn lễ của',
  },
  envelope: {
    greeting: 'Trân Trọng Kính Mời',
    inviteMessage: 'Đến dự lễ thành hôn của chúng tôi',
    openButton: 'Mở thiệp mời',
  },
  countdown: {
    title: 'Đếm Ngược Ngày Chung Đôi',
    pastTitle: 'Chúng Tôi Đã Về Chung Một Nhà!',
    units: { days: 'ngày', hours: 'giờ', minutes: 'phút', seconds: 'giây' },
  },
  reception: {
    ceremonyInfoTitle: 'Gia Đình Chúng Tôi',
    calendarButton: 'Thêm vào lịch',
  },
  gallery: {
    title: 'Khoảnh khắc',
    layout: 'masonry' as const,
    images: [
      { url: img('/gallery/1.jpg'), alt: '' },
      { url: img('/gallery/5.jpg'), alt: '' },
      { url: img('/gallery/3.jpg'), alt: '' },
      { url: img('/gallery/4.jpg'), alt: '' },
      { url: img('/gallery/9.jpg'), alt: '' },
      { url: img('/gallery/6.jpg'), alt: '' },
      { url: img('/gallery/7.jpg'), alt: '' },
      { url: img('/gallery/8.jpg'), alt: '' },
      { url: img('/gallery/2.jpg'), alt: '' },
      { url: img('/gallery/10.jpg'), alt: '' },
    ],
  },
  gift: {
    title: 'Hộp mừng cưới',
    thankYou: 'Cảm ơn bạn đã trở thành một phần trong câu chuyện của chúng tôi.',
    accounts: [],
    qrCodes: [],
  },
  music: {
    src: img('/music/canon-in-d-cello-piano.mp3'),
  },
  thankYou: {
    note: 'Sự hiện diện của Quý vị là niềm vinh hạnh cho gia đình chúng tôi!',
    noteLines: [
      'Sự hiện diện của Quý vị',
      'là niềm vinh hạnh cho gia đình chúng tôi!',
    ],
  },
}

const rsvpBase = {
  buttonLabel: 'Xác nhận',
  attendLabel: 'Bạn có tham dự được không?*',
  acceptLabel: 'Rất vui sẽ tham dự',
  declineLabel: 'Rất tiếc không tham dự',
  transportLabel: 'Bạn sẽ di chuyển thế nào?*',
  selfTransportLabel: 'Tự di chuyển',
  shuttleTransportLabel: 'Di chuyển theo xe',
  nameError: 'Vui lòng nhập tên của bạn.',
  attendError: 'Vui lòng cho chúng tôi biết bạn có tham dự không.',
  transportError: 'Vui lòng cho chúng tôi biết cách bạn di chuyển.',
  submitError: 'Gửi không thành công. Vui lòng thử lại sau.',
  questions: [] as { id: string; type: 'yesno' | 'choice'; label: string }[],
  wishLabel: 'Lời chúc',
  wishPlaceholder: 'Viết lời chúc gửi đến cô dâu chú rể...',
  show: true,
  maxGuests: 4,
}

/** Thiệp nhà trai — /thanhpb */
export const invitationGroom: InvitationData = {
  ...shared,
  envelope: {
    ...shared.envelope,
    inviteMessage: 'Đến dự lễ thành hôn của chúng tôi',
  },
  event: {
    title: 'Lễ Thành Hôn',
    inviteHeadline: [
      'Trân trọng kính mời tới dự lễ thành hôn',
      'chung vui cùng gia đình chúng tôi',
    ],
    showTitle: false,
    times: [{ time: '11:30' }],
    schedule: groomSchedule,
    date: '2026-10-18',
    timezone: 'Asia/Ho_Chi_Minh',
    venue: 'Lan Anh Hotel',
    address: 'Côn Sơn, Cộng Hòa, thành phố Chí Linh, Hải Dương cũ',
    mapAddress: '21.142515, 106.382773',
    mapLink: 'https://maps.app.goo.gl/T3xdREnZTUngBi447',
    lunarNote: 'Tức ngày 09 tháng 09 năm Bính Ngọ',
  },
  rsvp: {
    ...rsvpBase,
    endpoint: RSVP_SHEETS.thanhpb,
  },
  gift: {
    ...shared.gift,
    qrCodes: [{ label: 'Nhà trai — Bá Thanh', image: img('/qr/groom.png') }],
  },
}

/** Thiệp nhà gái — /linhbd */
export const invitationBride: InvitationData = {
  ...shared,
  envelope: {
    ...shared.envelope,
    inviteMessage: 'Đến dự lễ ăn hỏi của chúng tôi',
  },
  event: {
    title: 'Lễ Ăn Hỏi',
    inviteHeadline: [
      'Trân trọng kính mời tới dự bữa cơm thân mật',
      'chung vui cùng gia đình chúng tôi',
    ],
    showTitle: false,
    times: [{ time: '10:00' }],
    schedule: guestSchedule,
    date: '2026-10-11',
    timezone: 'Asia/Ho_Chi_Minh',
    venue: 'Tư gia nhà gái',
    address: 'Số 05, thôn Võng Ngoại, xã Phúc Lộc, thành phố Hà Nội',
    mapAddress: '21.137310, 105.550368',
    mapLink: 'https://maps.app.goo.gl/t3zq8Dj1dG1C2TRY9',
    lunarNote: 'Tức ngày 02 tháng 09 năm Bính Ngọ',
    extraCeremony: {
      title: 'Lễ Vu Quy',
      time: '08:00',
      date: '2026-10-18',
      lunarNote: 'Tức ngày 09 tháng 09 năm Bính Ngọ',
    },
  },
  rsvp: {
    ...rsvpBase,
    endpoint: RSVP_SHEETS.linhbd,
  },
  gift: {
    ...shared.gift,
    qrCodes: [{ label: 'Nhà gái — Đan Linh', image: img('/qr/bride.png') }],
  },
}
