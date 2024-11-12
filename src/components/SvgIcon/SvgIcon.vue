<script>
import { h } from 'vue';

const TAG_NAME_COMPONENT = 'svg';
const TAG_NAME_INNER = 'use';

const SvgIcon = (props, context) => {
  return h(
    TAG_NAME_COMPONENT,
    {
      ...context.attrs,
      width: 24,
      height: 24,
      class: 'icon',
      tabindex: '-1',
      focusable: 'false',
      'aria-hidden': 'true',
    },
    [
      h(TAG_NAME_INNER, {
        href: `#${props.name}`,
      }),
    ],
  );
};

export default SvgIcon;
</script>

<style lang="scss" src="./SvgIcon.scss"></style>
