import { expect } from 'chai';
import { applyFunctionRecursively } from '../../library/utils';

describe('applyFunctionRecursively', () => {
    it('single function', () => {
        const md = 'a';
        const def = 'b';
        expect(applyFunctionRecursively(def, md, (md, def) => ({
            md,
            def
        })))
            .to
            .eql({
                md,
                def
            });
    });
    it('function in array', () => {
        const md = 'a';
        const def = 'b';
        expect(applyFunctionRecursively(def, md, [(md, def) => ({
            md,
            def
        })]))
            .to
            .eql([{
                md,
                def
            }]);
    });
    it('function in object', () => {
        const md = 'a';
        const def = 'b';
        expect(applyFunctionRecursively(def, md, {a: (md, def) => ({
            md,
            def
        })}))
            .to
            .eql({a: {
                md,
                def
            }});
    });
});
