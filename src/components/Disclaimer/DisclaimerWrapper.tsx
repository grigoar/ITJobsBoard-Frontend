import { BsArrowRight } from 'react-icons/bs';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';

const DisclaimerWrapper = () => {
  return (
    <section className=" flex max-w-[800px] flex-col  items-center justify-between self-center pb-0  text-xl font-semibold">
      <Card>
        <h1 className="m-0 mb-8 h-full self-center text-left text-3xl font-bold leading-[3rem] text-[color:var(--color-blogs-date)]">
          Disclaimer: Important Notice for Readers
        </h1>
        <ul className=" list-disc font-normal [&>li]:mb-4 [&>li]:marker:text-[color:var(--color-blogs-date)]">
          <li>
            <p>
              The information provided on this health blog website is intended for general informational purposes only.
              It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of
              your physician or other qualified healthcare provider with any questions you may have regarding a medical
              condition.
            </p>
          </li>
          <li>
            <p>
              Reliance on the information presented on this website is at your own risk. The content is not intended to
              be a comprehensive source of medical information and should not be considered as such. The owners,
              authors, and contributors of this blog are not medical professionals, and the information shared here is
              based on personal experiences, research, and opinions.
            </p>
          </li>
          <li>
            <p>
              The information on this website may not always be up-to-date, accurate, or applicable to your specific
              situation. Health-related topics are constantly evolving, and medical guidelines can change. Therefore, it
              is crucial to consult with a healthcare professional for the most current and personalized advice.
            </p>
          </li>
          <li>
            <p>
              We do not endorse any specific products or services mentioned on this website, and any recommendations are
              made in good faith. You should always perform your own research and consult with professionals before
              making any health-related decisions or purchases.
            </p>
          </li>
          <li>
            <p>
              By using this website, you agree that the owners, authors, and contributors are not responsible for any
              direct or indirect consequences resulting from the use of the information provided here. You acknowledge
              that your use of the content on this website is solely at your discretion and risk.
            </p>
          </li>
          <li>
            <p>
              In conclusion, this health blog is a platform for sharing health and wellness information, experiences,
              and opinions. It is not a substitute for professional medical advice, and we encourage you to consult with
              qualified healthcare professionals for all your health-related concerns.
            </p>
          </li>
          <li>
            <p>
              Please read this disclaimer carefully, and if you do not agree with any part of it, we recommend
              refraining from using this website. Your continued use of this website indicates your acceptance of and
              agreement with this disclaimer.
            </p>
          </li>
        </ul>
        <div className="flex justify-center">
          <Button style={`btn btn-ghost `} link={'/posts'}>
            <div className="flex items-center justify-center">
              <span className="mr-2"> Read Articles</span>
              <BsArrowRight />
            </div>
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default DisclaimerWrapper;
