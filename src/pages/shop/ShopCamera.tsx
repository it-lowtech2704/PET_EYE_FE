import React, { useState } from 'react';
import { Video, Maximize2, Volume2, VolumeX, Grid3x3, Play, Plus, Trash2, X, Save } from 'lucide-react';

interface Camera {
  id: string;
  roomName: string;
  petName: string;
  petOwner: string;
  status: 'live' | 'offline';
  thumbnail: string;
  checkInDate: string;
  checkOutDate: string;
  ipAddress?: string;
  username?: string;
  password?: string;
}

const CAMERAS: Camera[] = [
  {
    id: 'CAM-001',
    roomName: 'Phòng VIP - Tầng 2',
    petName: 'Miu Miu',
    petOwner: 'Nguyễn Văn A',
    status: 'live',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    checkInDate: '04/03/2026',
    checkOutDate: '10/03/2026',
    ipAddress: '192.168.1.101',
    username: 'admin',
    password: '********',
  },
  {
    id: 'CAM-002',
    roomName: 'Phòng Standard - Tầng 1',
    petName: 'Buddy',
    petOwner: 'Trần Thị B',
    status: 'live',
    thumbnail: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    checkInDate: '05/03/2026',
    checkOutDate: '08/03/2026',
    ipAddress: '192.168.1.102',
    username: 'admin',
    password: '********',
  },
  {
    id: 'CAM-003',
    roomName: 'Phòng VIP - Tầng 3',
    petName: 'Luna',
    petOwner: 'Lê Minh C',
    status: 'live',
    thumbnail: 'https://images.unsplash.com/photo-1573865526739-10c1dd7e1e0d?w=400&q=80',
    checkInDate: '03/03/2026',
    checkOutDate: '12/03/2026',
    ipAddress: '192.168.1.103',
    username: 'admin',
    password: '********',
  },
  {
    id: 'CAM-004',
    roomName: 'Phòng Standard - Tầng 1',
    petName: 'Max',
    petOwner: 'Phạm Thu D',
    status: 'offline',
    thumbnail: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80',
    checkInDate: '02/03/2026',
    checkOutDate: '05/03/2026',
    ipAddress: '192.168.1.104',
    username: 'admin',
    password: '********',
  },
];

export default function ShopCamera() {
  const [cameras, setCameras] = useState<Camera[]>(CAMERAS);
  const [selectedCamera, setSelectedCamera] = useState<Camera>(CAMERAS[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    roomName: '',
    ipAddress: '',
    username: '',
    password: '',
    petName: '',
    petOwner: '',
  });

  const handleAddCamera = () => {
    const newCamera: Camera = {
      id: `CAM-${String(cameras.length + 1).padStart(3, '0')}`,
      roomName: formData.roomName,
      petName: formData.petName || 'Chưa có thú cưng',
      petOwner: formData.petOwner || 'Chưa có chủ',
      status: 'offline',
      thumbnail: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&q=80',
      checkInDate: new Date().toLocaleDateString('vi-VN'),
      checkOutDate: '-',
      ipAddress: formData.ipAddress,
      username: formData.username,
      password: formData.password,
    };
    setCameras([...cameras, newCamera]);
    setShowAddModal(false);
    setFormData({
      roomName: '',
      ipAddress: '',
      username: '',
      password: '',
      petName: '',
      petOwner: '',
    });
  };

  const handleDeleteCamera = (cameraId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa camera này?')) {
      setCameras(cameras.filter(cam => cam.id !== cameraId));
      if (selectedCamera.id === cameraId && cameras.length > 1) {
        setSelectedCamera(cameras[0].id === cameraId ? cameras[1] : cameras[0]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-screen-2xl mx-auto px-5 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quản lý Camera</h1>
            <p className="text-slate-600 dark:text-slate-400">Theo dõi thú cưng đang lưu trú tại cơ sở</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all shadow-lg"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Thêm camera</span>
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#1a2b4c] to-slate-700 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Grid3x3 size={18} />
              <span className="hidden sm:inline">{viewMode === 'single' ? 'Xem lưới' : 'Xem đơn'}</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Tổng camera', value: '12', icon: '📹', color: 'from-blue-500 to-blue-600' },
            { label: 'Đang hoạt động', value: '8', icon: '🟢', color: 'from-green-500 to-green-600' },
            { label: 'Thú cưng lưu trú', value: '8', icon: '🐾', color: 'from-purple-500 to-purple-600' },
            { label: 'Offline', value: '4', icon: '⚫', color: 'from-slate-500 to-slate-600' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} opacity-10`} />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {viewMode === 'single' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            {/* Main Camera View */}
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-2xl overflow-hidden relative aspect-video shadow-2xl">
                <img
                  src={selectedCamera.thumbnail}
                  alt={selectedCamera.petName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
                
                {/* Live Badge */}
                {selectedCamera.status === 'live' && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                )}

                {/* Camera Info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="text-white">
                    <p className="text-sm opacity-80">{selectedCamera.id} - {selectedCamera.roomName}</p>
                    <h3 className="text-2xl font-bold">{selectedCamera.petName}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                      <Maximize2 size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Pet Info Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Thông tin thú cưng</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Tên thú cưng</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedCamera.petName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Chủ nuôi</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedCamera.petOwner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Ngày nhận</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedCamera.checkInDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Ngày trả</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedCamera.checkOutDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Camera List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm h-fit">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Danh sách camera</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {cameras.map((camera) => (
                  <div
                    key={camera.id}
                    className={`relative group rounded-xl transition-all ${
                      selectedCamera.id === camera.id
                        ? 'bg-gradient-to-r from-[#1a2b4c] to-slate-700 text-white shadow-lg'
                        : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <button
                      onClick={() => setSelectedCamera(camera)}
                      className="w-full text-left p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <img src={camera.thumbnail} alt={camera.petName} className="w-full h-full object-cover" />
                          {camera.status === 'live' && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm truncate ${selectedCamera.id === camera.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                            {camera.petName}
                          </p>
                          <p className={`text-xs truncate ${selectedCamera.id === camera.id ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                            {camera.roomName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              camera.status === 'live'
                                ? selectedCamera.id === camera.id ? 'bg-white/20 text-white' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : selectedCamera.id === camera.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                            }`}>
                              {camera.status === 'live' ? 'Live' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleDeleteCamera(camera.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cameras.map((camera) => (
              <div
                key={camera.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group relative"
              >
                <div
                  className="relative aspect-video bg-slate-900 cursor-pointer"
                  onClick={() => {
                    setSelectedCamera(camera);
                    setViewMode('single');
                  }}
                >
                  <img src={camera.thumbnail} alt={camera.petName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {camera.status === 'live' && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCamera(camera.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm">{camera.petName}</p>
                    <p className="text-white/80 text-xs">{camera.roomName}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Chủ nuôi: {camera.petOwner}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {camera.checkInDate} - {camera.checkOutDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Camera Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">➕ Thêm camera mới</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Tên phòng *
                </label>
                <input
                  type="text"
                  value={formData.roomName}
                  onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                  placeholder="Ví dụ: Phòng VIP - Tầng 2"
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Địa chỉ IP *
                </label>
                <input
                  type="text"
                  value={formData.ipAddress}
                  onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                  placeholder="192.168.1.100"
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="admin"
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Thông tin thú cưng (tùy chọn)</p>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.petName}
                    onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                    placeholder="Tên thú cưng"
                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white"
                  />
                  
                  <input
                    type="text"
                    value={formData.petOwner}
                    onChange={(e) => setFormData({ ...formData, petOwner: e.target.value })}
                    placeholder="Tên chủ nuôi"
                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                Hủy
              </button>
              <button
                onClick={handleAddCamera}
                disabled={!formData.roomName || !formData.ipAddress || !formData.username || !formData.password}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                Thêm camera
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
