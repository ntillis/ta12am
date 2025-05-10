import {Extension} from "@tiptap/core";


const CustomTabIndent = Extension.create({
    addKeyboardShortcuts() {
        return {
          // Handle regular Tab key
          Tab: () => {
            // Check if the selection is within a list item
            const { state, commands } = this.editor
            const { $from } = state.selection
            const parentNode = $from.node($from.depth)
    
            if (parentNode.type.name === 'listItem') {
              // If within a list item, indent (add nested list or increase indent)
              commands.toggleList('bulletList', 'listItem')
            } else {
              // If not in a list, insert 4 non-breaking spaces
              this.editor.commands.insertContent('\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0')  // 4 non-breaking spaces
            }
    
            return true  // prevent default tab behavior
          },
        }
    }
    
})

export default CustomTabIndent