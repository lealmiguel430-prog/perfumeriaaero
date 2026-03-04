const AdminPlaceholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64 text-gray-500">
    <div className="text-center">
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p>Módulo en desarrollo.</p>
    </div>
  </div>
);

export default AdminPlaceholder;