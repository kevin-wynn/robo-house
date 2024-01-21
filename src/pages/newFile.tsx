import Wrapper from "../components/Wrapper.astro";
import { ImageTitle } from "../components/ImageTitle";

<Fragment>
  <Wrapper>
    <div class="p-8 md:p-24 flex flex-col justify-start">
      <ImageTitle client:load />
      <Text />
    </div>
  </Wrapper>
</Fragment>;
