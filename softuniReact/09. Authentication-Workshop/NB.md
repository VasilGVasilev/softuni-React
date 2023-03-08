Note that not every time you need to have an async function when communicating between modules,
async functions wrap returns in Promises but you can pass on the promises synchroniously through a chain of modules
and have them resolved in the last one 
see. servicesPassOnSynchroniously, not a rule but adequate solution for current problem 