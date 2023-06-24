interface ButtonPrimaryProps {
  children: React.ReactNode;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function ButtonPrimary({ children, Icon }: ButtonPrimaryProps) {
  return (
    <button
      className='flex gap-2 justify-between items-center text-primary rounded-xl 
          bg-gray-100 px-3 py-2 font-semibold'
    >
      {Icon && <Icon />}
      <p className='text-xl'>{children}</p>
    </button>
  );
}
export default ButtonPrimary;
