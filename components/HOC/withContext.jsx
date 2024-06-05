
/**
 * Higher-order component (HOC) that provides a context to a wrapped component.
 * 
 * @param {React.ComponentType} WrappedComponent - The component to be wrapped with the context.
 * @param {React.ComponentType} ContextProvider - The context provider component.
 * 
 * @returns {React.ComponentType} - The wrapped component with the provided context.
 * 
 * @example
 * const MyComponentWithContext = withContext(MyComponent, MyContextProvider);
 */
const withContext = (WrappedComponent, ContextProvider)=>{
    return (props) => {
        return (
            <ContextProvider>
                <WrappedComponent {...props} />
            </ContextProvider>
        );
    };
};

export default withContext;