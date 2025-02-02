const About = () => {
  return (
    <section className=" md:mx-20 py-4  sm:px-6 lg:px-8 flex items-center justify-center flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">About Us</h2>
      <div className=" flex flex-col lg:flex-row lg:justify-between ">
        {/* Text Section */}
        <div className="lg:w-1/2 lg:pl-2 mx-5">
          <p className="text-gray-600 mb-4 text-md md:text-xl">
            Welcome to our Infromation Sharing App! Here, we share insights,
            tips, and stories about various topics, ranging from technology to
            lifestyle. Our mission is to provide valuable content that inspires,
            educates, and empowers our readers.
          </p>
          <p className="text-gray-600 mb-4 text-md md:text-xl">
            Whether you're looking to stay updated on the latest trends, learn
            new skills, or find inspiration for your next project, we have
            something for everyone. Join us on this journey as we explore
            diverse subjects and build a community of curious minds.
          </p>
          <p className="text-gray-600 text-md md:text-xl">
            Thank you for being part of our InfoShare family! We hope you find
            our content meaningful and engaging.
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-6 lg:mb-0 lg:w-1/2 mx-10 mt-4">
          <img
            src="./infoshare.png"
            alt="About the Blog"
            className="w-full h-60 rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
