const AuthImagePattern = ({title,subtitle}) => {
  return (
    <div>
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-5 mt-20 me-16 rounded-3xl">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-8 p-3">
                    {[...Array(9)].map((_,i) => (
                        <div key={i} className={`aspect-square rounded-2xl bg-primary/10 ${i%2 === 0 ? "animate-pulse" : ""}`}/>
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>
    </div>
  )
}

export default AuthImagePattern