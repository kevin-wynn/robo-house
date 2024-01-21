import Wrapper from "../components/Wrapper.astro";
import { ImageTitle } from "../components/ImageTitle";
import { Text } from "../components/Text";
import { SkillsList } from "../components/SkillsList";

<Fragment>
  <Wrapper>
    <div class="p-6 md:p-12 flex flex-col justify-start">
      <ImageTitle client:load />
      <Text client:load />
    </div>
    <div class="p-6 md:p-12 flex flex-col justify-start">
      <SkillsList client:load />
    </div>
    <div class="p-6 md:p-12 flex flex-col justify-start">
      <Employment />
    </div>
  </Wrapper>
</Fragment>;
