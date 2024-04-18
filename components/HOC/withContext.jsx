
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