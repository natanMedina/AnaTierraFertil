export const Background = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-blue-50">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-200/30 via-green-300/20 to-blue-200/30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-400/15 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl"></div>
    </div>
  </div>
)
