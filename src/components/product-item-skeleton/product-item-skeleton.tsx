export default function ProductItemSkeleton() {
  return (
    <div className="w-[260px] bg-gray-100 rounded-xl animate-pulse">
      {/* Image */}
      <div className="w-full h-[260px] bg-gray-300 rounded-xl mb-4"></div>

      <div className="flex flex-col gap-2 justify-between mx-1">
        <div className="flex flex-row items-center justify-between mb-2">
          {/* Titre */}
          <div className="h-4 w-2/3 bg-gray-300 rounded mb-1"></div>

          {/* Prix */}
          <div className="h-4 w-1/4 bg-gray-300 rounded mb-1"></div>
        </div>
        {/* Quantité */}
        <div className="h-3 w-1/2 bg-gray-200 rounded mb-4"></div>

        {/* Bouton */}
        <div className="h-10 w-1/2 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
