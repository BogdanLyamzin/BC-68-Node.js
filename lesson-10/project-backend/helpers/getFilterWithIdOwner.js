const getFilterWithIdOwner = req => {
    const { id: _id } = req.params;
    const {_id: owner} = req.user;
    const filter = {
        owner,
        _id,
    };

    return filter;
}

export default getFilterWithIdOwner;