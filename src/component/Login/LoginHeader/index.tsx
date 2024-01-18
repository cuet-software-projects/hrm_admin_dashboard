import LogoImg from '../../../assets/images/Logo.png';
import Image from '../../Resuables/Image';
import Text from '../../Resuables/Text';

const LoginHeader: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center mb-10 lg:w-0">
        <Image src={LogoImg} alt="Logo" />
      </div>
      <Text
        title="Welcome back"
        fontWeight="bold"
        color="black-1"
        className="text-center font-poppins text-5xl"
      />
      <Text
        title="Welcome to our Human Resource Software!"
        size="sm"
        fontWeight="normal"
        color="black-1"
        className="text-center font-poppins font-normal mt-2"
      />
      <Text
        title="Please log in to manage your HR needs."
        size="sm"
        fontWeight="normal"
        color="black-1"
        className="text-center font-poppins font-normal"
      />
    </div>
  );
};

export default LoginHeader;
