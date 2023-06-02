const UploadedImage = ({ url }) => {
  console.log('url', url);
  // const handleClick = () => {};
  return (
    <>
      <div className="row p-3 uploaded">
        <div className="img-focus">
          {/* <img src="/images/pdf.png" alt="" width="80" height="80" className="img-upload" /> */}
          {url?.map((us) => (
            <a key={us} rel="noreferrer" href={us.imageUrl} target="_blank">
              <img src={us.imageUrl} alt="" width="80" height="80" className="img-upload" />
            </a>
          ))}
          {/* <a rel="noreferrer" href={url} target="_blank">
          <img  src={url} alt="" width="80" height="80" className="img-upload" />
          </a> */}
          {/* <img src="/images/photo.jpg" alt="" width="80" height="80" className="img-upload" />
        <img src="/images/photo.jpg" alt="" width="80" height="80" className="img-upload" />
        <img src="/images/photo.jpg" alt="" width="80" height="80" className="img-upload" />
        <img src="/images/photo.jpg" alt="" width="80" height="80" className="img-upload" /> */}
        </div>
      </div>
    </>
  );
};
export default UploadedImage;
