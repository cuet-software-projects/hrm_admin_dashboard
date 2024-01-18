import Icon from '../../../Resuables/Icon/Icon';

export default function ModalUploadContent() {
  return (
    <div className="w-full">
      <label
        htmlFor="my-modal-3"
        className="bg-secondary-1 p-2 rounded-full absolute right-2 top-2 cursor-pointer"
      >
        <Icon name={'ic_cross'} size={24} />
      </label>
      <p className="profileTextHeader pb-10 text-md md:text-lg">Upload Files</p>
      <div className="flex justify-center w-full border-2 border-dashed border-[#6F6B74] border-opacity-60 rounded-3xl p-5">
        <div className="flex flex-col items-center space-y-2">
          <Icon name="ic_chooseFile" size={72} />
          <div className="flex items-center space-x-2 text-sm font-semibold">
            <p>Drop your file, or</p>
            <p className="text-brand-grad-1">browse</p>
          </div>
          <p className="text-grey-1 text-xs">Supports: JPG, JPEG, PNG & PDF only</p>
        </div>
      </div>
      <div className="flex justify-end pt-5">
        <button
          className={`btn buttonBorder text-white-1 font-semibold text-sm md:text-md bg-opacity-80 rounded-xl 
        text-semibold bg-gradient-to-br from-brand-grad-1 to-brand-grad-2 hover:bg-gradient-to-bl 
        p-2 lg:px-4`}
        >
          <Icon name="ic_uploadFile" size={26} />
          Upload File
        </button>
      </div>
    </div>
  );
}
