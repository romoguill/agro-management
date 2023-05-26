interface Props {
  fallback: string;
  image?: string;
}

function Avatar({ fallback, image }: Props) {
  return (
    <div
      className='justify-center items-center rounded-full
         bg-gray-600 h-10 w-10 flex text-white font-semibold'
    >
      {image ? <img src={image} alt='' /> : fallback}
    </div>
  );
}
export default Avatar;
