<script>
export default {
    name: 'lazy-img',
    functional: true,
    props: {
        src : {
            type: String,
            required: true,
        },
        loaded : {
            type: Boolean,
            default: false,
        },
        width : {
            type: String,
        },
        href : {
            type: String,
        }
    },
    render: function (createElement, context) {
        const { src, loaded } = context.props 
        const attrs = loaded ? { src : src } : { 'data-src' : src }
        if (context.props.width) {
            attrs.style.width = context.prop.width
        }      

        if (context.props.href) {
            return createElement('a', {
                attrs: {
                    href: context.props.href,
                }                
            }, [ createElement('img',{ attrs }) ])
        }
        else {
            return createElement('img', { attrs })
        }
    }
}
</script>
