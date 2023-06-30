export const getColor = () => {
  const colors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-green-200",
    "bg-orange-200",
    "bg-purple-200",
    "bg-gray-200",
    "bg-amber-200",
    "bg-lime-200",
    "bg-emerald-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-fuchsia-200",
    "bg-violet-200",
  ];

  return colors[Math.ceil(Math.random() * colors.length - 1)];
};
