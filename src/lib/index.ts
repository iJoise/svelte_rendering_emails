import mjml2html from "mjml";
import type { SvelteComponentTyped } from "svelte";
import type { create_ssr_component } from "svelte/internal";

/**
 * Removes classes added to elements by the Svelte compiler because MJML does
 * not support them.
 */
const stripSvelteClasses = (html: string) =>
  html.replaceAll(/class="s-\w+"/g, "");

/** Renders a Svelte component as email-ready HTML. */
export const render = <Props extends Record<string, any>>(
  component: new (...args: any[]) => SvelteComponentTyped<Props>,
  props: Props
) => {
  const ssrComponent = component as unknown as ReturnType<
    typeof create_ssr_component
  >;

  // Render the component to MJML
  const { html: body, css, head } = ssrComponent.render(props);

  const mjml = `<mjml>
        <mj-head>
          ${stripSvelteClasses(head)}
          <mj-attributes>
            <mj-accordion border="none" padding="1px" />
              <mj-accordion-element icon-wrapped-url="https://i.imgur.com/Xvw0vjq.png" icon-unwrapped-url="https://i.imgur.com/KKHenWa.png" icon-height="24px" icon-width="24px" />
              <mj-accordion-title font-family="Roboto, Open Sans, Helvetica, Arial, sans-serif" background-color="#fff" color="#031017" padding="15px" font-size="18px" />
              <mj-accordion-text font-family="Open Sans, Helvetica, Arial, sans-serif" background-color="#fafafa" padding="15px" color="#505050" font-size="14px" />
            </mj-attributes>
          <mj-style>${css.code}</mj-style>
        </mj-head>
        <mj-body>${stripSvelteClasses(body)}</mj-body>
      </mjml>`;

  // Render MJML to HTML
  const { html, errors } = mjml2html(mjml);
  if (errors.length > 0) console.warn(errors);

  return html;
};
